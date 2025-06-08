// file: src/scripts/pages/add/add-model.js
import { addNewStory } from "../data/api";

const AddModel = {
  async saveStory({ description, photoFile, lat, lon, token }) {
    return await addNewStory({ description, photoFile, lat, lon, token });
  },
};

export default AddModel;
