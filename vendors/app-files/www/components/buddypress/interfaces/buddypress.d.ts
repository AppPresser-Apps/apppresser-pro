export declare module Members {

  export interface Xprofile {
      groups: any;
  }

  export interface AvatarUrls {
      full: string;
      thumb: string;
  }

  export interface Self {
      href: string;
  }

  export interface Collection {
      href: string;
  }

  export interface Links {
      self: Self[];
      collection: Collection[];
  }

  export interface RootObject {
      id: number;
      name: string;
      user_login: string;
      link: string;
      member_types: any[];
      xprofile: Xprofile;
      friendship_status: boolean;
      is_blocked: boolean;
      can_message: boolean;
      can_friend: boolean;
      mention_name: string;
      avatar_url: AvatarUrls;
      badges: any;
      _links: Links;
  }

}

export declare module Activity {

  export interface Content {
      rendered: string;
  }

  export interface UserAvatar {
      full: string;
      thumb: string;
  }

  export interface Self {
      href: string;
  }

  export interface Collection {
      href: string;
  }

  export interface User {
      embeddable: boolean;
      href: string;
  }

  export interface Favorite {
      href: string;
  }

  export interface Group {
      embeddable: boolean;
      href: string;
  }

  export interface Links {
      self: Self[];
      collection: Collection[];
      user: User[];
      favorite: Favorite[];
      group: Group[];
  }

  export interface RootObject {
      user_id: number;
      component: string;
      content: Content;
      date: Date;
      id: number;
      link: string;
      primary_item_id: number;
      secondary_item_id: number;
      status: string;
      title: string;
      type: string;
      favorited: boolean;
      user_avatar: UserAvatar;
      _links: Links;
  }

}

export declare module xProfile {

  export interface Description {
      rendered: string;
  }

  export interface Self {
      href: string;
  }

  export interface Collection {
      href: string;
  }

  export interface Links {
      self: Self[];
      collection: Collection[];
  }

  export interface RootObject {
      id: number;
      name: string;
      description: Description;
      group_order: number;
      can_delete: boolean;
      _links: Links;
  }

}

export declare module Groups {

    export interface Description {
        raw: string;
        rendered: string;
    }

    export interface AvatarUrls {
        full: string;
        thumb: string;
    }

    export interface Self {
        href: string;
    }

    export interface Collection {
        href: string;
    }

    export interface User {
        embeddable: boolean;
        href: string;
    }

    export interface Links {
        self: Self[];
        collection: Collection[];
        user: User[];
    }

    export interface RootObject {
        id: number;
        creator_id: number;
        parent_id: number;
        date_created: Date;
        description: Description;
        enable_forum: boolean;
        link: string;
        name: string;
        slug: string;
        status: string;
        types: any[];
        avatar_url: AvatarUrls;
        _links: Links;
        is_request_pending: boolean;
        is_user_admin: boolean;
        is_user_banned: boolean;
        is_user_member: boolean;
        is_user_mod: boolean;
        is_visible: boolean;
    }

}