import Ember from 'ember';

export default Ember.Service.extend({
    init(){
        this.getVariablesFromLocalStorage();
    },
    sessionObject: null,
    storageVariables:{},
    setSession(tokenObject) {
        var access_token = tokenObject.access_token;
        var token_type = tokenObject.token_type;
        var authorization = `${token_type} ${access_token}`;
        var sessionObject = {access_token, token_type, authorization};
        this.set('sessionObject',sessionObject);

        window.localStorage.setItem('session',JSON.stringify(sessionObject));
    },
    getSession(){
        var sessionObject = this.get('sessionObject');
        if(sessionObject === null) {
            var localSession = window.localStorage.getItem('session');
            if(localSession && localSession !== "null") {
                sessionObject = JSON.parse(localSession);
                this.set('sessionObject',sessionObject);
            }
        }
        return sessionObject;
    },
    setVariable(key,value) {
        var storageVariables = this.get('storageVariables');
        storageVariables[key] = value;
        this.set('storageVariable',storageVariables);
        this.setVariblesIntoLocalStorage(storageVariables);
        return value;
    },
    setVariblesIntoLocalStorage(storageVariables){
        window.localStorage.setItem('storageVariables',JSON.stringify(storageVariables || {}));
    },
    getVariable(key, defaultValue) {
        var storageVariables = this.get('storageVariables');
        if(!(key in storageVariables)) {
            this.setVariable(key,defaultValue);
        }
        return storageVariables[key] || defaultValue;
    },
    getVariablesFromLocalStorage(){
        var storageVariables = window.localStorage.getItem('storageVariables') || "{}";
        if(storageVariables && storageVariables !== "null") {
            storageVariables = JSON.parse(storageVariables)
        } else if(storageVariables === "null") {
            storageVariables = {}
        }
        this.set('storageVariables',storageVariables);
    }
});
