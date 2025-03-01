import Status from "../models/status.js";

class StatusRepository {
  async createStatus(data) {
    return await Status.create(data);
  }

  async findStatusByName(name) {
    return await Status.findOne({ name }).exec();
  }

  async findStatusById(id) {
    return await Status.findById(id).exec();
  }

  async getAllStatus() {
    return await Status.find().exec();
  }

  async updateStatus(id, data) {
    return await Status.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteStatus(id) {
    return await Status.findByIdAndDelete(id).exec();
  }
}

export default new StatusRepository();
