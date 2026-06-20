export const manifest = {
  screens: {
    scr_3bxfs9: { name: "Home", route: "/", position: { "x": 1560, "y": 220 } },
    scr_jk0ge8: { name: "Login / Register", route: "/login", position: { "x": 160, "y": 220 } },
    scr_ma4kxs: { name: "Browse Helpers", route: "/browse", position: { "x": 160, "y": 2200 } },
    scr_xt80sw: { name: "Helper Profile", route: "/helper/1", position: { "x": 1560, "y": 2200 } },
    scr_sr11r1: { name: "Booking Flow", route: "/book/1", position: { "x": 2960, "y": 2200 } },
    scr_gbixh4: { name: "My Bookings", route: "/bookings", position: { "x": 4360, "y": 2200 } },
    scr_eg2wnb: { name: "Account Settings", route: "/account", position: { "x": 160, "y": 4180 } },
    scr_zq6lhw: { name: "Helper Dashboard", route: "/helper", position: { "x": 160, "y": 6160 } },
    scr_gy9fnj: { name: "Helper Profile Setup", route: "/helper/profile", position: { "x": 1560, "y": 6160 } },
    scr_y29xf4: { name: "Helper Job History", route: "/helper/history", position: { "x": 2960, "y": 6160 } },
    scr_q1vmvn: { name: "Admin Dashboard", route: "/admin", position: { "x": 160, "y": 8140 } },
    scr_1zblvs: { name: "Admin Verification Queue", route: "/admin/verifications", position: { "x": 1560, "y": 8140 } },
    scr_co7vdf: { name: "Admin Manage Users", route: "/admin/users", position: { "x": 2960, "y": 8140 } }
  },
  sections: {
    sec_go3zsa: { name: "Authentication & Home", x: 0, y: 0, width: 2920, height: 1180 },
    sec_sx15gq: { name: "Customer Booking Flow", x: 0, y: 1980, width: 5720, height: 1180 },
    sec_7jpslo: { name: "Account Management", x: 0, y: 3960, width: 1520, height: 1180 },
    sec_v1ezds: { name: "Helper Provider Flow", x: 0, y: 5940, width: 4320, height: 1180 },
    sec_azzusc: { name: "Admin Management", x: 0, y: 7920, width: 4320, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_go3zsa", children: [
    { kind: "screen", id: "scr_jk0ge8" },
    { kind: "screen", id: "scr_3bxfs9" }]
  },
  { kind: "section", id: "sec_sx15gq", children: [
    { kind: "screen", id: "scr_ma4kxs" },
    { kind: "screen", id: "scr_xt80sw" },
    { kind: "screen", id: "scr_sr11r1" },
    { kind: "screen", id: "scr_gbixh4" }]
  },
  { kind: "section", id: "sec_7jpslo", children: [
    { kind: "screen", id: "scr_eg2wnb" }]
  },
  { kind: "section", id: "sec_v1ezds", children: [
    { kind: "screen", id: "scr_zq6lhw" },
    { kind: "screen", id: "scr_gy9fnj" },
    { kind: "screen", id: "scr_y29xf4" }]
  },
  { kind: "section", id: "sec_azzusc", children: [
    { kind: "screen", id: "scr_q1vmvn" },
    { kind: "screen", id: "scr_1zblvs" },
    { kind: "screen", id: "scr_co7vdf" }]
  }]

};