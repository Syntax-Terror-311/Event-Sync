import db from '../config/db.js';

export const fetchSpeakers = async () => db.speaker.findMany({
  include: {
    sessions: {
      include: {
        event: true,
        room: true
      }
    }
  },
  orderBy: { name: 'asc' }
}).then(speakers => speakers.map(speaker => ({
  ...speaker,
  social_links: speaker.social_links ? JSON.parse(speaker.social_links) : null
})));

export const fetchSpeakerById = async (id) => db.speaker.findUnique({
  where: { id },
  include: {
    sessions: {
      include: {
        event: true,
        room: true
      }
    }
  }
}).then(speaker => speaker ? {
  ...speaker,
  social_links: speaker.social_links ? JSON.parse(speaker.social_links) : null
} : null);

export const createNewSpeaker = async (data) => db.speaker.create({
  data: {
    name: data.name,
    bio: data.bio,
    photo_url: data.photo_url,
    social_links: data.social_links ? JSON.stringify(data.social_links) : null,
    website: data.website
  }
}).then(speaker => ({
  ...speaker,
  social_links: speaker.social_links ? JSON.parse(speaker.social_links) : null
}));

export const updateExistingSpeaker = async (id, data) => {
  const updateData = { ...data };
  if (updateData.social_links) {
    updateData.social_links = JSON.stringify(updateData.social_links);
  }
  return db.speaker.update({
    where: { id },
    data: updateData
  }).then(speaker => ({
    ...speaker,
    social_links: speaker.social_links ? JSON.parse(speaker.social_links) : null
  }));
};

export const deleteExistingSpeaker = async (id) => db.speaker.delete({
  where: { id }
});
