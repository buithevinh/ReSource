import { 
    FETCHING_FOLLOW_ITEM,FETCHING_CATELOGY_ITEM,
    FETCHING_DATA, FETCHING_DATA_SUCCESS, 
    FETCHING_DATA_FAILURE, 
    FETCHING_ACCESSTOKEN_SUCCESS, 
    FETCHING_ACCESSTOKEN,
    FETCHING_PROFILE_SUCCESS,
    SEND_FEEDBACK,
    ON_SEND_FEEDBACK,
    GET_PROFILE_SUCCESS,
    ON_CHANGE_FOLLOW,
    GET_FOLLOW_DATA
} from '../actions/actionTypes';

const initialState  = {
    dataFire: [],
    dataFetched: false,
    isFetching: false,
    error: false, 
    isLoading: false,
    accessToken: null,
    isLoadingAccessToken: false,
    category: [],
    isLoadingCategory: false,
    isLoadingFollow: false,
    follow: [],
    userID: null,
    url: null,
    name: null,
    about: null,
    email: null,
    link: null,
    location: null,
    isLoadingProfile: false,
    profile: null,
    isFeedback: false,
    typeCategory: null,
    userProfile: []
}

export default dataReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_DATA: 
            return {
                ...state,
                dataFire: [],
                isFetching: true
            }
        case FETCHING_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFire: action.data,
                isLoading: true,
            }
        case FETCHING_DATA_FAILURE: 
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case FETCHING_ACCESSTOKEN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                accessToken: action.accessToken.accessToken,
                isLoadingAccessToken: true,
                userID: action.accessToken.userID,
                url: action.accessToken.image,
                name: action.accessToken.name,
                about: action.accessToken.about,
                email: action.accessToken.email,
                link: action.accessToken.link,
                location: action.accessToken.location
            }
        case FETCHING_ACCESSTOKEN: 
            return {
                ...state,
                accessToken: [],
            }

        case FETCHING_CATELOGY_ITEM: 
            return {
                ...state,
                category: action.item.items,
                isLoadingCategory: true,
                typeCategory: action.item.category
            }

        case FETCHING_FOLLOW_ITEM:
            return {
                ...state,
                follow: action.item,
                isLoadingFollow: true
            }
        case FETCHING_PROFILE_SUCCESS: 
            return {
                ...state,
                profile: action.item,
                isLoadingProfile: true
            }
        case SEND_FEEDBACK: 
            return {
                ...state,
                isFeedback: true
            }

        case ON_SEND_FEEDBACK: 
            return {
                ...state,
                isFeedback: false
            }

        case GET_PROFILE_SUCCESS: 
            return {
                ...state,
                userProfile: action.item
            }

        case ON_CHANGE_FOLLOW: 
            return {
                ...state,
            }
            
        case GET_FOLLOW_DATA: 
            return {
                ...state,
                dataFire: action.items
            }

        default: return state
    }
}