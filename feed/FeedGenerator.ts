import FeedService from "./FeedService";

class FeedGenerator {

    public feedPage = () => {
        try {
            const feed = require('./feed.json');
            return feed;
        } catch(err) {
            console.log(err);
        }    
    }

}

const feedGenerator = new FeedGenerator();
export default feedGenerator;
