const app = () => {
    const appObj = {
        body: document.querySelector('body'),

        // CREATE FUNCTIONS FOR THE SITE
        functionName: () => {
            console.log('Worked!');
        },

        // THEN ADD THEM TO THE RUN FUNCTION
        run: function () {
            this.functionName();
        },
    };

    appObj.run();
};

document.addEventListener('DOMContentLoaded', () => {
    app();
});
