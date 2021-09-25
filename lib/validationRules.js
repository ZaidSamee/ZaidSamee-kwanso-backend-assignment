var ValidationRules = {
    register: {
        email: 'required|email',
        password: 'required|string|min:6'
    },

    login: {
        email: 'required|email',
        password: 'required|string|min:6'
    },
    creatTasK:{
        name:'required|string'
    }
}

module.exports = ValidationRules;
