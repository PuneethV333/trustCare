export const returnTypeOfCost = (x:"hourly"|"monthly"|"yearly") => {
    switch (x) {
        case "hourly":
            return "/hr"
        case "monthly":
            return "/mo"
        case "yearly":
            return "/yr"
        default:
            break;
    }
}