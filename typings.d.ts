//  Poster Plus Image Posts
export interface Feeds extends FeedBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "poster";
  _blockImagePoster: boolean;
  user?: {
    _ref: string;
    _type: "reference";
  };
}

export type Tag = {
  id: string;
  text: string;
};

export type FeedBody = {
  title?: string;
  username: string;
  profileImg: string;
  image?: string;
  address?: string;
  category?: string;
  description?: string;
  eventEndDate?: date;
  eventLink?: string;
  eventStartDate?: date;
  eventType?: string;
  gigTags?: Tag[];
  gigType?: string;
  location?: string;
  name?: string;
  postType?: string;
  price?: number;
  subcategory?: string;
  video?: string;
  userId?: string;
};

//  Poster Plus Comment Posts
export interface Comment extends commentBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "comment";
  poster: {
    _ref: string;
    _type: "reference";
  };
}

export type commentBody = {
  comment: string;
  feedId: string;
  username: string;
  profileImage: string;
};

//  User
export interface User extends UserBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "user";
}

export type UserBody = {
  username: string | null | undefined;
  email: string | null | undefined;
  profileImg: string | null | undefined;
  skills?: Tag[];
  studyDegree?: string;
  diplomes?: { diplome: string }[];
  yearsOfExp?: number | string;
  id?: string;
};

// Story
export interface Stories extends StoryBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "stories";
  user: {
    _ref: string;
    _type: "reference";
    username?: string;
  };
}

export type StoryBody = {
  title: string;
  duration: number;
  url: string | null | undefined;
  storyType?: string;
  description?: string;
  seeMore?: boolean;
  userId?: string;
};

export type GlobalContent = {
  setFeed: Dispatch<SetStateAction<FeedsImages[]>>;
};
