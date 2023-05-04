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
