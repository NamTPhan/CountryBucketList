export interface IBucketListIdea {
  idea: string;
  achieved: number;
}

export interface IBucketList {
  countryId: number;
  country: string;
  ideas: IBucketListIdea[];
}
