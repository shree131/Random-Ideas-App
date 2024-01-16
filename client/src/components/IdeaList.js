import IdeasApi from '../services/ideasApi';

class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector('#idea-list');
        this._ideas = [];
        this.getIdeas();

        this._validTags = new Set();
        this._validTags.add('business');
        this._validTags.add('technology');
        this._validTags.add('software');
        this._validTags.add('education');
        this._validTags.add('health');
        this._validTags.add('inventions');
    };

    // Alt to .then()
    async getIdeas() {
        try {
            const res = await IdeasApi.getIdeas(); // await - returns a promise
            this._ideas = res.data.data; // Custom API returns an object with success, data 
            console.log(this._ideas);

            // Render Ideas after done fetching
            this.render();
        } catch (error) {
            console.log(error);
        }
    };

    addIdeaToList() {
        this.getIdeas();
    }


    getTagClass(tag) {

        tag = tag.toLowerCase();

        if (this._validTags.has(tag)) {
            return `tag-${tag}`;
        } else {
            return '';
        }
    };

    render() {

        this._ideaListEl.innerHTML = this._ideas.map(idea => {
            const tagClass = this.getTagClass(idea.tag);

            return `
            <div class="card">
            <button class="delete"><i class="fas fa-times"></i></button>
            <h3>
                ${idea.text}
            </h3>
            <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
            <p>
                Posted on <span class="date">${idea.date}</span> by
                <span class="author">${idea.username}</span>
            </p>
            </div>`;
        }).join(''); // Join from array -> string
    };
};

export default IdeaList;