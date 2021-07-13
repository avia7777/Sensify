import { makeAutoObservable, action } from "mobx"
import queryString from 'query-string';

interface post {
    topic: string,
    topicImage: string,
    level: number,
    group: string
    groupTitle: string,
    classType: string,
    postTitle: string,
    content: string
  }

const createQueryParams = (userid) => {
    const queryObject = {filter: {"where": {"userid": userid}}};
    return queryString.stringify(queryObject);
}

export default class FeedStore {
    public pages = [];
    private queryParams = ""

    constructor(userid) {
        makeAutoObservable(this)
        this.queryParams = createQueryParams(userid);
        console.log("this.queryParams ==> ", this.queryParams);
        // console.log("query ==> ", queryString.stringify({userid: userid}));
    }

    public async fetchPages() {
        // will be change to filter with user id
        await fetch('http://192.168.1.4:3000/feed?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22userid%22%3A%207%0A%20%20%7D%0A%7D')
        .then(response => response.json())
        .then(
            action("fetchSuccess", response => {
                // console.log("Pages ==> ", response);
                this.pages = [];
                response.forEach(page => {
                    this.pages.push(page.posts)
                });
                // this.pages = response;
                // console.log("THIS.PAGES ==> ", this.pages);
                console.log("FetchSuccess!");
            }),
            action("fetchError", error => {
                console.log(error);
            })
        )
    }

    public get pagesAmount() {
        return this.pages.length;
    }
}

export const pagesStore = new FeedStore(7);
