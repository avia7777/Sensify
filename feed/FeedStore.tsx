import { makeAutoObservable, makeObservable, action, observable, computed, runInAction } from "mobx"

interface Post {
    topic: string,
    topicImage: string,
    level: number,
    group: string
    groupTitle: string,
    classType: string,
    postTitle: string,
    content: string
  }

export default class FeedStore {
    public pages = [] as Post[][];
    private pagesIndex = 0;

    constructor() {
        makeObservable(this, {
            pages: observable,
            nextPage: computed,
            // @ts-ignore
            fetchPages: action

        });
    }

    public async fetchPages() {
        try {
            const resObj = await fetch('http://thymos.life/feed');
            const res = await resObj.json();
            runInAction(()=>{
                this.pages = [];
                res.forEach(page => {
                    this.pages.push(page.posts)
                });
            });
            console.log("Success to fetch feed pages");
        } catch(e) {
            console.log("Failed to fetch feed pages - ", e)
        }
    }

    public get nextPage(): Post[] {
        if (this.pages[this.pagesIndex]){
            this.pagesIndex++;
            return this.pages[this.pagesIndex-1];
        } else {
            this.pagesIndex = 0;
            console.log("########################################");
            console.log("Starting over from the top!");
            console.log("########################################");
            return this.pages[this.pagesIndex];
        }
    }

}

export const pagesStore = new FeedStore();
