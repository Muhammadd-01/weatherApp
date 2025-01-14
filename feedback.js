document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');

    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        console.log('Feedback submitted:', { name, email, message });
        
        // Simulate sending feedback
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Thank you for your feedback!');
        feedbackForm.reset();
    });
});

