import Ember from 'ember';
import config from 'twitter-feedback/config/environment';
import {task} from 'ember-concurrency';

export default Ember.Controller.extend({
    session:Ember.inject.service('session'),
    tweets:[],
    recentHash:[],

    addRecentHash(hashtag){
        var recentHash = this.get('recentHash');
        if(hashtag && !recentHash.includes(hashtag)) {
            console.log(recentHash.length);
            if(recentHash.length >= 10) {// allows 10 entries
                recentHash.popObject();
            }
            recentHash.unshiftObject(hashtag);
            this.get('session').setVariable('recentHash',recentHash);
            this.set('recentHash',recentHash);
        }
    },

    authorizeTask:task(function * (){
        var tokenObject = yield Ember.$.ajax({
            type:"GET",
            url:config.hostURL + "/oauth2/token"
        });
        console.log(tokenObject,JSON.parse(tokenObject).access_token);
        this.get('session').setSession(JSON.parse(tokenObject));  
    }),

    getTweetsTask:task(function * (query) {
        var Authorization = this.get('session').getSession().authorization;
        var tweets;
        try {
            tweets = yield Ember.$.ajax({
                type:"GET",
                url:config.hostURL + "/search/tweets",
                dataType:"json",
                data:{
                    q:query
                },
                headers:{
                    Authorization
                }
            });
            this.addRecentHash(query);
        } catch(e){
            console.log("show error to dashboard");
        }
        if(!tweets){
            this.set('tweets',[]);
            console.log("show error to dashboard");
            return '';
        }
        if('errors' in tweets) {
            if(tweets.errors[0].code===89) {
                throw 'Invalid session';
            } else {
                console.log("show error to dashboard");
            }
        } else {
            if('statuses' in tweets) {
                this.set('tweets',tweets.statuses || []);
            } else {
                this.set('tweets',[]);
            }
        }
    }),

    tweetsTask:task(function * (tweet,force) {
        console.log("called",tweet,force);
        if(!tweet){
            this.set('tweets',[]);
            return;
        }
        var authorization = (this.get('session').getSession() || {}).authorization;
        if(!authorization || force) {
            yield this.get('authorizeTask').perform();
            try {
                yield this.get('getTweetsTask').perform(tweet);
            } catch(e) {
                if(!force) {
                    // yield this.get('tweetsTask').perform(tweet,true);
                }
            }
        } else {
            try {
                yield this.get('getTweetsTask').perform(tweet);
            } catch(e) {
                if(!force) {
                    // yield this.get('tweetsTask').perform(tweet,true);
                }
            }
        }
    }),
    
    actions:{
        recentTweets(hash) {
            this.set('search',hash);
            this.get('tweetsTask').perform(hash);
        }
    }
});
