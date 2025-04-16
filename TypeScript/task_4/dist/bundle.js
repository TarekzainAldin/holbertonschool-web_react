/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/subjects/Cpp.ts":
/*!****************************!*\
  !*** ./js/subjects/Cpp.ts ***!
  \****************************/
/***/ (function() {

/// <reference path="./Teacher.ts" />
/// <reference path="./Subject.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Subjects;
(function (Subjects) {
    var Cpp = /** @class */ (function (_super) {
        __extends(Cpp, _super);
        function Cpp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cpp.prototype.getRequirements = function () {
            return 'Here is the list of requirements for Cpp';
        };
        Cpp.prototype.getAvailableTeacher = function () {
            if (!this.teacher || this.teacher.experienceTeachingC === undefined || this.teacher.experienceTeachingC <= 0) {
                return 'No available teacher';
            }
            return "Available Teacher: ".concat(this.teacher.firstName);
        };
        return Cpp;
    }(Subject));
    Subjects.Cpp = Cpp;
})(Subjects || (Subjects = {}));


/***/ })

/******/ 	});
/******/ 	__webpack_modules__["./js/subjects/Cpp.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFDQUFxQztBQUNyQyxxQ0FBcUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFckMsSUFBVSxRQUFRLENBaUJmO0FBakJILFdBQVUsUUFBUTtJQUtkO1FBQXlCLHVCQUFPO1FBQWhDOztRQVdBLENBQUM7UUFWQyw2QkFBZSxHQUFmO1lBQ0UsT0FBTywwQ0FBMEMsQ0FBQztRQUNwRCxDQUFDO1FBRUQsaUNBQW1CLEdBQW5CO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLEVBQUU7Z0JBQzVHLE9BQU8sc0JBQXNCLENBQUM7YUFDL0I7WUFDRCxPQUFPLDZCQUFzQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBRSxDQUFDO1FBQ3hELENBQUM7UUFDSCxVQUFDO0lBQUQsQ0FBQyxDQVh3QixPQUFPLEdBVy9CO0lBWFksWUFBRyxNQVdmO0FBQ0gsQ0FBQyxFQWpCTyxRQUFRLEtBQVIsUUFBUSxRQWlCZjs7Ozs7Ozs7VUVwQkg7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3R5cGVzY3JpcHRfZGVwZW5kZW5jaWVzLy4vanMvc3ViamVjdHMvQ3BwLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHRfZGVwZW5kZW5jaWVzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdF9kZXBlbmRlbmNpZXMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3R5cGVzY3JpcHRfZGVwZW5kZW5jaWVzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9UZWFjaGVyLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1N1YmplY3QudHNcIiAvPlxuXG5uYW1lc3BhY2UgU3ViamVjdHMge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgVGVhY2hlciB7XG4gICAgICBleHBlcmllbmNlVGVhY2hpbmdDPzogbnVtYmVyO1xuICAgIH1cbiAgXG4gICAgZXhwb3J0IGNsYXNzIENwcCBleHRlbmRzIFN1YmplY3Qge1xuICAgICAgZ2V0UmVxdWlyZW1lbnRzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnSGVyZSBpcyB0aGUgbGlzdCBvZiByZXF1aXJlbWVudHMgZm9yIENwcCc7XG4gICAgICB9XG4gIFxuICAgICAgZ2V0QXZhaWxhYmxlVGVhY2hlcigpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMudGVhY2hlciB8fCB0aGlzLnRlYWNoZXIuZXhwZXJpZW5jZVRlYWNoaW5nQyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMudGVhY2hlci5leHBlcmllbmNlVGVhY2hpbmdDIDw9IDApIHtcbiAgICAgICAgICByZXR1cm4gJ05vIGF2YWlsYWJsZSB0ZWFjaGVyJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYEF2YWlsYWJsZSBUZWFjaGVyOiAke3RoaXMudGVhY2hlci5maXJzdE5hbWV9YDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL2pzL3N1YmplY3RzL0NwcC50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9