import IdeasApi from "../services/ideasApi";
import IdeaList from './IdeaList';

class IdeaForm {
    constructor() {
        this._formModal = document.querySelector('#form-modal');
    }

    _addEventListener() {
        this._form.addEventListener('submit', this._handleSubmit.bind(this));
        this._ideaList = new IdeaList();
    };

    async _handleSubmit(e) {
        e.preventDefault();
        const textValue = this._form.elements.text.value;
        const tagValue = this._form.elements.tag.value;
        const usernameValue = this._form.elements.username.value;

        // Frontend input validations
        if (!textValue || !tagValue || !usernameValue) {
            alert('Please enter all fields');
            return;
        };

        // Save username to local storage
        localStorage.setItem('username', usernameValue);

        const idea = {
            // Name of form input
            text: textValue,
            tag: tagValue,
            username: usernameValue
        }

        // Add data to server
        const newIdea = await IdeasApi.createIdea(idea);

        // Add data to list
        this._ideaList.addIdeaToList();

        // Clear input fields after submit
        this._form.elements.text.value = '';
        this._form.elements.tag.value = '';
        this._form.elements.username.value = '';

        // Render page after saving to local storage
        this.render();

        // Close Modal - by dispatching a custom event
        document.dispatchEvent(new Event('closemodal'));
    };

    // Creating something similar to react
    render() {
        const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
        this._formModal.innerHTML = `
        <form id="idea-form">
        <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" value="${username}" id="username" />
        </div>
        <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
    </form>`;

        // Grab the form after it is rendered
        this._form = document.querySelector('#idea-form');
        this._addEventListener();
    };
};

export default IdeaForm;