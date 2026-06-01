import { fetchSpeakers, fetchSpeakerById, createNewSpeaker, updateExistingSpeaker, deleteExistingSpeaker } from '../service/speaker.service.js';
import { sendSuccess } from '../middleware/error.middleware.js';
import { NotFoundException } from '../errors/NotFoundException.js';

export const getSpeakers = async (req, res, next) => {
  try {
    const speakers = await fetchSpeakers();
    sendSuccess(res, speakers);
  } catch (error) {
    next(error);
  }
};

export const getSpeakerById = async (req, res, next) => {
  try {
    const speaker = await fetchSpeakerById(req.params.id);
    if (!speaker) throw new NotFoundException('Speaker not found');
    sendSuccess(res, speaker);
  } catch (error) {
    next(error);
  }
};

export const createSpeaker = async (req, res, next) => {
  try {
    const speaker = await createNewSpeaker(req.body);
    sendSuccess(res, speaker, 201);
  } catch (error) {
    next(error);
  }
};

export const updateSpeaker = async (req, res, next) => {
  try {
    const speaker = await updateExistingSpeaker(req.params.id, req.body);
    sendSuccess(res, speaker);
  } catch (error) {
    next(error);
  }
};

export const deleteSpeaker = async (req, res, next) => {
  try {
    await deleteExistingSpeaker(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};