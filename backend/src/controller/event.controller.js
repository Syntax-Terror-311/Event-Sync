import { fetchEvents, fetchEventById, createNewEvent, updateExistingEvent, deleteExistingEvent } from '../service/event.service.js';
import { sendSuccess } from '../middleware/error.middleware.js';
import { NotFoundException } from '../errors/NotFoundException.js';

export const getEvents = async (req, res, next) => {
  try {
    const events = await fetchEvents();
    sendSuccess(res, events);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await fetchEventById(req.params.id);
    if (!event) throw new NotFoundException('Event not found');
    sendSuccess(res, event);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const { title, description, start_date, end_date, location } = req.body;
    const event = await createNewEvent({
      title,
      description,
      start_date,
      end_date,
      location,
      organizer_id: req.user.id
    });
    sendSuccess(res, event, 201);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { title, description, start_date, end_date, location } = req.body;
    const data = {};
    if (title) data.title = title;
    if (description !== undefined) data.description = description;
    if (start_date) data.start_date = start_date;
    if (end_date) data.end_date = end_date;
    if (location !== undefined) data.location = location;
    const event = await updateExistingEvent(req.params.id, data);
    sendSuccess(res, event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    await deleteExistingEvent(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};