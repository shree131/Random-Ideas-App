class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector('#idea-list');
        this._ideas = [
            {
                id: 1,
                text: 'Idea 1',
                username: 'Brad',
                tag: 'Business',
                date: '02/01/2023'
            },
            {
                id: 2,
                text: 'Idea 2',
                username: 'Jack',
                tag: 'Inventions',
                date: '02/03/2023'
            },
        ];

        this._validTags = new Set();
        this._validTags.add('business');
        this._validTags.add('technology');
        this._validTags.add('software');
        this._validTags.add('education');
        this._validTags.add('health');
        this._validTags.add('inventions');
    }

    getTagClass(tag) {

        tag = tag.toLowerCase();

        if (this._validTags.has(tag)) {
            return `tag-${tag}`;
        } else {
            return '';
        }
    }

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
    }
};

export default IdeaList;