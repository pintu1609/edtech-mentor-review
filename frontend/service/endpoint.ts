import { getSubmissions } from "@/backend/service/admin/admin"
import { updateSubmission } from "@/backend/service/student/student"

const ENDPOINTS = {
    REGISTER: "/api/user/register",
    LOGIN: "/api/user/login/",
    GETALLMENTOR: "/api/user/getallmentor",
    GETADMINSTATS: "/api/admin/stats",
    CREATEASSIGNMENT:"/api/admin/assignment",
    GETASSIGNMENTS:"/api/admin/assignment",
    GETRECENTSUBMISSION:"/api/admin/submissions",
    GETMENTOROVERVIEW:"/api/admin/mentors",
    DELETEASSIGNMENT:'/api/admin/assignment/',
    //STUDNT
    VIEWASSIGNEMNT:"/api/student/assignments",
    SUBMITASSIGNMENT:"/api/student/submit",
    STUDENTSUBMISSION:"/api/student/submissions",
    STUDENTSTATS:"/api/student/stats",
    UPDATESUBMISION:"/api/student/submit/",

    // MENTOR
    GETMENTORSUBMISSION:"/api/mentor/submissions",
    GETMENTORSTATS:"/api/mentor/stats",
    REVIEWSUBMISSION:"/api/mentor/review",
   
}

export default ENDPOINTS