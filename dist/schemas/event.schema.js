"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = exports.Event = exports.LocationSchema = exports.Location = exports.EventCategory = exports.EventStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var EventStatus;
(function (EventStatus) {
    EventStatus["UPCOMING"] = "upcoming";
    EventStatus["ONGOING"] = "ongoing";
    EventStatus["COMPLETED"] = "completed";
    EventStatus["CANCELLED"] = "cancelled";
})(EventStatus || (exports.EventStatus = EventStatus = {}));
var EventCategory;
(function (EventCategory) {
    EventCategory["FIVE_K"] = "5K";
    EventCategory["TEN_K"] = "10K";
    EventCategory["HALF_MARATHON"] = "Half Marathon";
    EventCategory["FULL_MARATHON"] = "Full Marathon";
    EventCategory["TRAIL"] = "Trail";
    EventCategory["FUN_RUN"] = "Fun Run";
})(EventCategory || (exports.EventCategory = EventCategory = {}));
let Location = class Location {
    name;
    address;
    lat;
    lng;
};
exports.Location = Location;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Location.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Location.prototype, "lat", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Location.prototype, "lng", void 0);
exports.Location = Location = __decorate([
    (0, mongoose_1.Schema)()
], Location);
exports.LocationSchema = mongoose_1.SchemaFactory.createForClass(Location);
let Event = class Event {
    title;
    description;
    date;
    startTime;
    endTime;
    location;
    category;
    capacity;
    registeredCount;
    price;
    image;
    status;
    createdBy;
};
exports.Event = Event;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Event.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Event.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.LocationSchema, required: true }),
    __metadata("design:type", Location)
], Event.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: EventCategory, required: true }),
    __metadata("design:type", String)
], Event.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Event.prototype, "capacity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Event.prototype, "registeredCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Event.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: EventStatus, default: EventStatus.UPCOMING }),
    __metadata("design:type", String)
], Event.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Event.prototype, "createdBy", void 0);
exports.Event = Event = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Event);
exports.EventSchema = mongoose_1.SchemaFactory.createForClass(Event);
//# sourceMappingURL=event.schema.js.map