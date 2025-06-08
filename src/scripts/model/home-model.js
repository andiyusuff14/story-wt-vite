// src/scripts/pages/home/home-model.js
import { getStories } from "../data/api.js";
import StoryCacheDB from "../utils/story-cache-db.js";

const HomeModel = {
  async getAllStories() {
    try {
      const stories = await getStories();
      await StoryCacheDB.clearStories();
      await StoryCacheDB.saveStories(stories);
      return stories;
    } catch (error) {
      console.warn("Gagal fetch API, ambil dari cache:", error.message);
      const cachedStories = await StoryCacheDB.getAllStories();
      return cachedStories || [];
    }
  },
};

export default HomeModel;
