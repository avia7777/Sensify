// const posts = require('./posts');

// ############################################
// ## We will save doneGroups per user (unique key), and the FeedGenerator wiil pull groups that not in doneGroups.
// ## In addition, we will save variable counter that will end FeedGenerator when it reaches MAX_GROUPS_IN_FEED.
// ############################################

interface post {
	classType: string,
	group: string
	level: number,
	content: string,
	chapter?: number,
	type?: string,
	dependsOn?: string[],
}

const readPosts = (): post[] => {
	const fs = require('fs');
	try {
		const jsonString = fs.readFileSync('./posts.json');
		const posts = JSON.parse(jsonString);
		// console.log("POSTS ==> ", posts);
		return posts;
	} catch(err) {
		console.log(err);
	}
}


export default class FeedService {
	private posts = readPosts();
	private MAX_GROUPS_IN_FEED = 5;
	private doneGroups = [];
	private maxLevel = 3;
	private groupsCounter = 0;
	private newFeed = [];

	constructor() {
		this.createFeed();
		this.saveFeed('./feed.json');
	}

	private getPostsFromLevel = (level: number, doneGroups: string[], counter: number) => {
		let fetchedGroups = [];
		let feed = this.posts.filter(post => {
			if (doneGroups.indexOf(post.group) === -1 && post.level === level){
				if (counter === this.MAX_GROUPS_IN_FEED) {
					return fetchedGroups.indexOf(post.group) !== -1;
				} else {
					if (fetchedGroups.indexOf(post.group) === -1) {
					// console.log("post ==> ", post);
					fetchedGroups.push(post.group);
					counter += 1;
					}
					return true;
				}
			}
		});
		this.groupsCounter = counter;
		// console.log("level ==> ", level);
		// console.log("doneGroups ==> ", doneGroups);
		// console.log("fetchedGroups ==> ", fetchedGroups);
		// console.log("groupsCounter ==> ", groupsCounter);
		// console.log("feed ==> ", feed);
		return [feed, fetchedGroups];
	}

	private sortPostsByGroups = (postsArray, fetchedGroups: string[]) => {
		let postsByGroups = {};
		for (const group of fetchedGroups) {
			// console.log("Group ==> ", group);
			postsByGroups[group] = postsArray.filter(post=> post.group === group);
		}
		return postsByGroups;
	}
	
	
	private getRandGroupKey = (postsByGroups) => {
		let keys = Object.keys(postsByGroups);
		let randIndex = Math.floor(keys.length * Math.random())
		return keys[randIndex];
	}

	private createFeed = () => {
		for (let level=1; level<=this.maxLevel; level++) {
			if (this.MAX_GROUPS_IN_FEED - this.groupsCounter > 0) {
				let postsArray, fetchedGroups;
				[postsArray, fetchedGroups] = this.getPostsFromLevel(level, this.doneGroups, this.groupsCounter); // feed.filter(post=>post.level === level)
				// console.log("gropusArray ==> ", postsArray);

				let postsByGroups = this.sortPostsByGroups(postsArray, fetchedGroups);
				// console.log("postsByGroups ==> ", postsByGroups);

				// console.log("length ==>" ,Object.keys(postsByGroups).length);
				while (Object.keys(postsByGroups).length > 0) {
					let randGroupKey = this.getRandGroupKey(postsByGroups); // randGroupKey = "B" (Random)
					// console.log("RandKey ==> ", randGroupKey);
					let randGroupArray = postsByGroups[randGroupKey]; // [{post},{post},{post},{post}]
					// console.log("randGroupArray ==> ", randGroupArray);
					this.newFeed.push(randGroupArray.shift()); //get the first element and remove it from the array!!!!)
					// console.log("newFeed ==> ", this.newFeed);
					// console.log("After deleting");
					// console.log("randGroupArray ==> ", randGroupArray);
					if (randGroupArray.length === 0) {
						delete postsByGroups[randGroupKey];
						// console.log("#################Deleted###############");
						// console.log("Keys ==> ", Object.keys(postsByGroups));
					}
				}
			}
		}
	}

	private saveFeed = (path: string) => {
		const fs = require('fs');
		try {
			console.log("New Feed ==> ", this.newFeed);
			const jsonString = JSON.stringify(this.newFeed);
			fs.writeFileSync(path, jsonString);
			console.log("Success!!");
		} catch(err) {
			console.log(err);
		}
	}

}

let myFeed = new FeedService();




// import posts from './posts';

// const MAX_GROUPS_IN_FEED = 5;
// let doneGroups = [];
// let maxLevel = 3;
// let groupsCounter = 0;
// let newFeed = [];



// const getPostsFromLevel = (level: number, doneGroups: string[], counter: number) => {
// 	let fetchedGroups = [];
// 	let feed = posts.postsFeed.filter(post => {
// 		if (doneGroups.indexOf(post.group) === -1 && post.level === level){
// 			if (counter === MAX_GROUPS_IN_FEED) {
// 				return fetchedGroups.indexOf(post.group) !== -1;
// 			} else {
// 				if (fetchedGroups.indexOf(post.group) === -1) {
// 				// console.log("post ==> ", post);
// 				fetchedGroups.push(post.group);
// 				counter += 1;
// 				}
// 				return true;
// 			}
// 		}
// 	});
// 	groupsCounter = counter;
// 	console.log("level ==> ", level);
// 	// console.log("doneGroups ==> ", doneGroups);
// 	// console.log("fetchedGroups ==> ", fetchedGroups);
// 	// console.log("groupsCounter ==> ", groupsCounter);
// 	// console.log("feed ==> ", feed);
// 	return [feed, fetchedGroups];
// }


// const sortPostsByGroups = (postsArray, fetchedGroups: string[]) => {
// 	let postsByGroups = {};
// 	for (const group of fetchedGroups) {
// 		// console.log("Group ==> ", group);
// 		postsByGroups[group] = postsArray.filter(post=> post.group === group);
// 	}
// 	return postsByGroups;
// }


// const getRandGroupKey = (postsByGroups) => {
// 	let keys = Object.keys(postsByGroups);
// 	let randIndex = Math.floor(keys.length * Math.random())
// 	return keys[randIndex];
// }


// let level: number;
// for (level=1; level<=maxLevel; level++) {
// 	if (MAX_GROUPS_IN_FEED - groupsCounter > 0) {
// 		let postsArray, fetchedGroups;
// 		[postsArray, fetchedGroups] = getPostsFromLevel(level, doneGroups, groupsCounter); // feed.filter(post=>post.level === level)
// 		// console.log("gropusArray ==> ", postsArray);

// 		let postsByGroups = sortPostsByGroups(postsArray, fetchedGroups);
// 		// console.log("postsByGroups ==> ", postsByGroups);

// 		// console.log("length ==>" ,Object.keys(postsByGroups).length);
// 		let i = 0;
// 		while (Object.keys(postsByGroups).length > 0) {
// 			let randGroupKey = getRandGroupKey(postsByGroups); // randGroupKey = "B" (Random)
// 			console.log("RandKey ==> ", randGroupKey);
// 			let randGroupArray = postsByGroups[randGroupKey]; // [{post},{post},{post},{post}]
// 			console.log("randGroupArray ==> ", randGroupArray);
// 			newFeed.push(randGroupArray.shift()); //get the first element and remove it from the array!!!!)
// 			console.log("newFeed ==> ", newFeed);
// 			console.log("After deleting");
// 			console.log("randGroupArray ==> ", randGroupArray);
// 			if (randGroupArray.length === 0) {
// 				delete postsByGroups[randGroupKey];
// 				console.log("#################Deleted###############");
// 				console.log("Keys ==> ", Object.keys(postsByGroups));
// 			}
// 			i = i+1;
// 			// if (i === 20) {
// 			// 	break
// 			// }
// 		}
// 	}
// }
	// fetchedGroups = [...fetchedGroups,Object.keys(postsByGroups.map(group=>${group}${level})]
        
 	       // groupsArray:  [{group:"A"},{group:"B"},{}]
 
//  	       // postsByGroups = {"A":[{},{},{},{}], "B":[], "C":[]}

// //	groupsCounter += postsByGroups.length;
// //	if groupsCounter === 5 {
// //		break
// //	}

// 	while postsExists(postsByGroups){
// 		randGroupKey = getRandGroupKey(); // randGroupKey = "B" (Random)
// 		randGroupArray = postsByGroups[randGroupKey]	; // [{post},{post},{post},{post}]
// 		if (randGroupArray.lengt===0){ continue }
// 		newFeed.push(randGroupArray.pop()) (//get the first element and remove it from the array!!!!)
// 	}


// 
