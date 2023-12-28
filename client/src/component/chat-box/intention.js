const responses=[
    {
      trigger:'hi',
      response: 'Hi! How can I help you today?',
    },
    {
        trigger:'hello',
        response: 'Hello! How can I help you today?',
    },
    {
      trigger: 'goodbye',
      response: 'Goodbye! Have a great day.',
    },
    {
      trigger: 'weather',
      response: 'I\'m sorry, I am not able to provide weather updates at this time.',
    },{
      trigger:'question',
      response:'To ask a question click on "Ask Question" button 🙃.'
    },{
      trigger:'hey',
      response:"Hey,If you want to ask a question click on ask question button🙃"
    }
];



export function getResponse(message) {
    const response = responses.find(r => message.toLowerCase().includes(r.trigger));
    if (response) {
      return response.response;
    } else {
      // If no matching response is found, return a default response
      return 'I am not sure how to respond to that.';
    }
}
  
  
    