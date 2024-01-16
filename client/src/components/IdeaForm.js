class IdeaForm {
    constructor() {
        this._formModal = document.querySelector('#form-modal');
    }

    _addEventListener() {
        this._form.addEventListener('submit', this._handleSubmit.bind(this));
    };

    _handleSubmit(e) {
        e.preventDefault();

        const idea = {
            // Name of form input
            text: this._form.elements.text.value,
            tag: this._form.elements.tag.value,
            username: this._form.elements.username.value
        }
        console.log(idea);

        // Clear input fields after submit
        this._form.elements.text.value = '';
        this._form.elements.tag.value = '';
        this._form.elements.username.value = '';

        // Close Modal - by dispatching a custom event
        document.dispatchEvent(new Event('closemodal'));
    };

    // Creating something similar to react
    render() {
        this._formModal.innerHTML = `
        <form id="idea-form">
        <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" />
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