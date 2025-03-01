import StatusRepository from "../repositories/status.js";
import { createError } from "../utils/errorUtils.js";

class StatusService {
  async createStatus(data) {
    const statusExist = await StatusRepository.findStatusByName(data.name);

    if (statusExist) throw createError("Status already exists.", 409);

    return await StatusRepository.createStatus(data);
  }

  async findStatusByName(name) {
    const status = await StatusRepository.findStatusByName(name);

    if (!status) throw createError("Status not found", 404);

    return status;
  }

  async findStatusById(id) {
    const status = await StatusRepository.findStatusById(id);

    if (!status) throw createError("Status not found", 404);

    return status;
  }

  async getAllStatus() {
    const status = await StatusRepository.getAllStatus();

    if (!status) throw createError("Status not found", 404);

    return status;
  }

  async updateStatus(id, data) {
    const status = await StatusRepository.updateStatus(id, data);

    if (!status) throw createError("Status not found", 404);

    return status;
  }

  async deleteStatus(id) {
    const status = await StatusRepository.deleteStatus(id);

    if (!status) throw createError("Status not found", 404);

    return status;
  }
}

export default new StatusService();
