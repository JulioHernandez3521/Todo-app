import html from './app.html?raw';

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    //Cuando se mande llamra la funcion
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    })();
}