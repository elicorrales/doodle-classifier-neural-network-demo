'use strict';

const messagesElem = document.getElementById('messages');
const clearMessages = () => {
    messagesElem.className = '';
    messagesElem.innerHTML = '';
}
const showMessages = (type, messages) => {
    messagesElem.className = 'alert alert-' + type;
    messagesElem.innerHTML = messages;
}

/*
const trainingMessagesElem = document.getElementById('trainingMessages');
const clearTrainingMessages = () => {
    trainingMessagesElem.className = '';
    trainingMessagesElem.innerHTML = '';
}
const showTrainingMessages = (type, messages) => {
    trainingMessagesElem.className = 'alert alert-' + type;
    trainingMessagesElem.innerHTML = messages;
}
*/