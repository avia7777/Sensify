
class FeedService {
    
    private static PAGES = 5
    private POSTS_FOR_PAGE = 20;
    private counter = 0;

    public getPages = () => {
        // ##Change before build!!! - just for node:
        // const fs = require('fs');

        let feedPages = [];
        try {
            // ##Change before build!!! - just for node:
            // const feedJsonString = fs.readFileSync('./feed.json');
            const posts = require('./feed.json');
            // console.log(feedJsonString);
            // const posts = JSON.parse(feedJsonString);
            
            for (let i = 1; i <= FeedService.PAGES; i++){
                let feedPage = [];
                // console.log("Feed Page ==> ", feedPage);
                for (let j = 0; j < this.POSTS_FOR_PAGE; j++) {
                    // console.log("Counter ==> ", this.counter % posts.length);
                    feedPage.push(posts[this.counter % posts.length]);
                    this.counter ++;
                }
                feedPages.push(feedPage);
                // console.log("Feed Pages Length ==> ", feedPages.length);
                // console.log("Feed Page Length ==> ", feedPage.length);
                // console.log("Feed Page ==> ", feedPage);
            }
        } catch(err) {
            console.log(err);
        }
        // console.log("RESULT ==> ", feedPages);
        return feedPages;
    }
    
}

const feedService = new FeedService();
// feedGenerator.generatePages();
// console.log("##############################################################");
// console.log("Second Run:")
// console.log("##############################################################");
// feedGenerator.generatePages();
// console.log("##############################################################");
// console.log("Third Run:")
// console.log("##############################################################");
// feedGenerator.generatePages();
export default feedService;
