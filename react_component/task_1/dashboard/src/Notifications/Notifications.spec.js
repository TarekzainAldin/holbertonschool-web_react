import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { shallow } from "enzyme";

describe("Notifications component", () => {
  // 1. اختبار وجود العنوان "Here is the list of notifications"
  test("should display the notifications title", () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/Here is the list of notifications/i); // نبحث عن النص مع تجاهل حالة الأحرف
    expect(titleElement).toBeInTheDocument(); // نتأكد أنه موجود في الـ DOM
  });

  // 2. اختبار وجود الزر (button element)
  test("should have a close button", () => {
    render(<Notifications />);
    const buttonElement = screen.getByRole("button", { name: /close/i }); // ابحث عن الزر باستخدام aria-label
    expect(buttonElement).toBeInTheDocument(); // تأكد من وجود الزر
  });

  // 3. اختبار وجود 3 عناصر li
  test("should render 3 list items", () => {
    render(<Notifications />);
    const listItems = screen.getAllByRole("listitem"); // ابحث عن العناصر li
    expect(listItems.length).toBe(3); // تحقق من وجود 3 عناصر
  });

  // 4. اختبار الضغط على الزر
  test('should log "Close button has been clicked" when close button is clicked', () => {
    // ننشئ دالة وهمية لمراقبة الكونسول
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    render(<Notifications />);
    const buttonElement = screen.getByRole("button", { name: /close/i }); // نبحث عن الزر باستخدام aria-label
    fireEvent.click(buttonElement); // نحاكي ضغط الزر

    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked"); // نتأكد أن الرسالة تم تسجيلها في الكونسول

    consoleSpy.mockRestore(); // استعادة الكونسول بعد الاختبار
  });
});

const notificationsList = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  {
    id: 3,
    type: "urgent",
    html: { __html: "<strong>Urgent requirement</strong>" },
  },
];

describe("Notifications", () => {
  it("renders the list of notifications correctly", () => {
    render(<Notifications notifications={notificationsList} />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(3);
    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.getByText("New resume available")).toBeInTheDocument();
    expect(screen.getByText("Urgent requirement")).toBeInTheDocument();
  });
});

const sampleNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
];

describe("Notifications component", () => {
  it('Always displays "Your notifications" title', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find(".notifications-title").text()).toEqual(
      "Your notifications"
    );
  });

  describe("When displayDrawer is false", () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);

    it("does not render Notifications container", () => {
      expect(wrapper.find(".Notifications").exists()).toBe(false);
    });

    it("does not render the close button", () => {
      expect(wrapper.find("button").exists()).toBe(false);
    });

    it("does not render the p element", () => {
      expect(wrapper.find("p").exists()).toBe(false);
    });

    it("does not render notification items", () => {
      expect(wrapper.find("NotificationItem").length).toBe(0);
    });
  });

  describe("When displayDrawer is true", () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} notifications={sampleNotifications} />
    );

    it("renders Notifications container", () => {
      expect(wrapper.find(".Notifications").exists()).toBe(true);
    });

    it("renders the close button", () => {
      expect(wrapper.find("button").exists()).toBe(true);
    });

    it("renders the paragraph with correct text", () => {
      expect(wrapper.find("p").text()).toBe(
        "Here is the list of notifications"
      );
    });

    it("renders the correct number of notification items", () => {
      expect(wrapper.find("NotificationItem")).toHaveLength(
        sampleNotifications.length
      );
    });
  });

  describe("When displayDrawer is true and notifications is empty", () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} notifications={[]} />
    );

    it('renders the paragraph with "No new notification for now"', () => {
      expect(wrapper.find("p").text()).toBe("No new notification for now");
    });

    it("does not render any NotificationItem", () => {
      expect(wrapper.find("NotificationItem").length).toBe(0);
    });
  });
});
