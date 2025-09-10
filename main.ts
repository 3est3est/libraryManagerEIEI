// ================== อินเทอร์เฟซ ==================
interface Borrowable {
  borrow(memberName: string): string; // ยืมรายการ
  returnItem(): string;                // คืนรายการ
  isAvailable(): boolean;             // ตรวจสอบว่าพร้อมให้ยืมหรือไม่
}

// ================== คลาสนามธรรม (Abstract Class) ==================
abstract class LibraryItem implements Borrowable {
  private _title: string;      // ชื่อรายการ (private)
  protected itemId: string;    // รหัสรายการ (protected เพื่อให้ subclass เข้าถึงได้)
  private _available: boolean; // สถานะการให้ยืม

  constructor(title: string, itemId: string) {
    this._title = title;
    this.itemId = itemId;
    this._available = true; // เริ่มต้นพร้อมให้ยืม
  }

  // Getter สำหรับชื่อรายการ
  get title(): string {
    return this._title;
  }

  // Setter สำหรับสถานะการให้ยืม
  set available(available: boolean) {
    this._available = available;
  }

  // Getter สำหรับสถานะการให้ยืม
  get available(): boolean {
    return this._available;
  }

  // เมธอดนามธรรมที่ต้อง override ใน subclass
  abstract getDetails(): string;

  // ยืมรายการ
  borrow(memberName: string): string {
    if (this._available) {
      this._available = false;
      return `รายการ "${this._title}" ถูกยืมโดย ${memberName}`;
    }
    return `รายการ "${this._title}" ไม่พร้อมให้ยืม`;
  }

  // คืนรายการ
  returnItem(): string {
    this._available = true;
    return `รายการ "${this._title}" ถูกคืนแล้ว`;
  }

  // ตรวจสอบสถานะการให้ยืม
  isAvailable(): boolean {
    return this._available;
  }
}

// ================== คลาสลูก (Subclasses) ==================

// คลาสหนังสือ
class Book extends LibraryItem {
  private author: string; // ชื่อผู้แต่ง

  constructor(title: string, itemId: string, author: string) {
    super(title, itemId);
    this.author = author;
  }

  // Override เมธอดยืมเพื่อแสดงข้อความเฉพาะหนังสือ
  override borrow(memberName: string): string {
    if (this.isAvailable()) {
      this.available = false;
      return `หนังสือ "${this.title}" ถูกยืมโดย ${memberName}`;
    }
    return `หนังสือ "${this.title}" ไม่พร้อมให้ยืม`;
  }

  // Override เมธอดคืนเพื่อแสดงข้อความเฉพาะหนังสือ
  override returnItem(): string {
    this.available = true;
    return `หนังสือ "${this.title}" ถูกคืนแล้ว`;
  }

  // ใช้งาน abstract method
  getDetails(): string {
    return `หนังสือ: "${this.title}" โดย ${this.author} (รหัส: ${this.itemId})`;
  }
}

// คลาสนิตยสาร
class Magazine extends LibraryItem {
  private issueDate: string; // วันที่ออกฉบับ

  constructor(title: string, itemId: string, issueDate: string) {
    super(title, itemId);
    this.issueDate = issueDate;
  }

  // Override เมธอดยืมเพื่อแสดงข้อความเฉพาะนิตยสาร
  override borrow(memberName: string): string {
    if (this.isAvailable()) {
      this.available = false;
      return `นิตยสาร "${this.title}" ถูกยืมโดย ${memberName}`;
    }
    return `นิตยสาร "${this.title}" ไม่พร้อมให้ยืม`;
  }

  // Override เมธอดคืนเพื่อแสดงข้อความเฉพาะนิตยสาร
  override returnItem(): string {
    this.available = true;
    return `นิตยสาร "${this.title}" ถูกคืนแล้ว`;
  }

  getDetails(): string {
    return `นิตยสาร: "${this.title}" ฉบับวันที่ ${this.issueDate} (รหัส: ${this.itemId})`;
  }
}

// คลาสหนังสือเสียง
class AudioBook extends LibraryItem {
  private author: string;   // ชื่อผู้แต่ง
  private duration: number; // ความยาว (นาที)
  private narrator: string; // ผู้บรรยาย

  constructor(title: string, itemId: string, author: string, duration: number, narrator: string) {
    super(title, itemId);
    this.author = author;
    this.duration = duration;
    this.narrator = narrator;
  }

  getDetails(): string {
    return `หนังสือเสียง: "${this.title}" โดย ${this.author}, บรรยายโดย ${this.narrator}, ความยาว: ${this.duration} นาที (รหัส: ${this.itemId})`;
  }
}

// ================== สื่อดิจิทัล ==================
class DigitalMedia extends LibraryItem {
  private fileFormat: string;  // รูปแบบไฟล์ เช่น PDF, EPUB, MP4
  private fileSizeMB: number; // ขนาดไฟล์ (เมกะไบต์)

  constructor(title: string, itemId: string, fileFormat: string, fileSizeMB: number) {
    super(title, itemId);
    this.fileFormat = fileFormat;
    this.fileSizeMB = fileSizeMB;
  }

  getDetails(): string {
    return `สื่อดิจิทัล: "${this.title}" รูปแบบ: ${this.fileFormat}, ขนาด: ${this.fileSizeMB}MB (รหัส: ${this.itemId})`;
  }
}

// ================== อุปกรณ์ ==================
class Equipment extends LibraryItem {
  private type: string;     // ประเภท เช่น เกมกระดาน, โน้ตบุ๊ก, ชุดอุปกรณ์
  private quantity: number; // จำนวน

  constructor(title: string, itemId: string, type: string, quantity: number) {
    super(title, itemId);
    this.type = type;
    this.quantity = quantity;
  }

  getDetails(): string {
    return `อุปกรณ์: "${this.title}" ประเภท: ${this.type}, จำนวน: ${this.quantity} ชิ้น (รหัส: ${this.itemId})`;
  }
}

// ================== สมาชิกห้องสมุด ==================
class LibraryMember {
  private _memberName: string;              // ชื่อสมาชิก
  private _memberId: string;                // รหัสสมาชิก
  private _borrowedItems: LibraryItem[];    // รายการที่ยืม

  constructor(memberName: string, memberId: string) {
    this._memberName = memberName;
    this._memberId = memberId;
    this._borrowedItems = []; // เริ่มต้นไม่มีรายการที่ยืม
  }

  // Getter สำหรับชื่อสมาชิก
  get memberName(): string {
    return this._memberName;
  }

  // ยืมรายการ
  borrowItem(item: LibraryItem): string {
    if (item.isAvailable()) {
      this._borrowedItems.push(item); // เพิ่มรายการที่ยืมในลิสต์ของสมาชิก
      return item.borrow(this._memberName);
    }
    return `รายการไม่พร้อมให้ยืม`;
  }

  // คืนรายการ
  returnItem(itemId: string): string {
    const index = this._borrowedItems.findIndex((i) => i["itemId"] === itemId);
    if (index !== -1) {
      const item = this._borrowedItems[index];
      this._borrowedItems.splice(index, 1); // ลบรายการออกจากลิสต์ที่ยืม
      return item!.returnItem();
    }
    return `ไม่พบรายการในรายการที่ยืม`;
  }

  // แสดงรายการที่ยืมทั้งหมด
  listBorrowedItems(): string {
    if (this._borrowedItems.length === 0) return "ไม่มีรายการที่ยืม";
    return this._borrowedItems.map((i) => i.getDetails()).join("\n");
  }
}

// ================== ห้องสมุด ==================
class Library {
  private items: LibraryItem[];      // รายการทั้งหมดในห้องสมุด
  private members: LibraryMember[];  // สมาชิกทั้งหมด

  constructor() {
    this.items = [];    // เริ่มต้นไม่มีรายการ
    this.members = [];  // เริ่มต้นไม่มีสมาชิก
  }

  // เพิ่มรายการใหม่
  addItem(item: LibraryItem): void {
    this.items.push(item);
  }

  // เพิ่มสมาชิกใหม่
  addMember(member: LibraryMember): void {
    this.members.push(member);
  }

  // ค้นหารายการจากรหัส
  findItemById(itemId: string): LibraryItem | undefined {
    return this.items.find((i) => i["itemId"] === itemId);
  }

  // ค้นหาสมาชิกจากรหัส
  findMemberById(memberId: string): LibraryMember | undefined {
    return this.members.find((m) => m["_memberId"] === memberId);
  }

  // ดำเนินการยืม (ผ่านระบบห้องสมุด)
  borrowItem(memberId: string, itemId: string): string {
    const member = this.findMemberById(memberId);
    const item = this.findItemById(itemId);

    if (!member) return "ไม่พบสมาชิก";
    if (!item) return "ไม่พบรายการ";

    return member.borrowItem(item);
  }

  // ดำเนินการคืน (ผ่านระบบห้องสมุด)
  returnItem(memberId: string, itemId: string): string {
    const member = this.findMemberById(memberId);
    if (!member) return "ไม่พบสมาชิก";

    return member.returnItem(itemId);
  }

  // สรุปข้อมูลห้องสมุด
  getLibrarySummary(): string {
    return `
--- สรุปข้อมูลห้องสมุด ---
รายการทั้งหมด:
${this.items.map((i) => i.getDetails()).join("\n")}

สมาชิกทั้งหมด:
${this.members.map((m) => m.memberName).join(", ")}
`;
  }
}


const book = new Book("TypeScript Guide", "B001", "John Doe");
const magazine = new Magazine("Tech Monthly", "M001", "2023-09");
const member = new LibraryMember("Alice", "MEM001");
const library = new Library();
library.addItem(book);
library.addItem(magazine);
library.addMember(member);
console.log(library.borrowItem("MEM001", "B001"));
// ตัวอย่างผลลัพธ์: "Book TypeScript Guide borrowed by Alice"
console.log(member.listBorrowedItems());
// ตัวอย่างผลลัพธ์: "Book: TypeScript Guide by John Doe (ID: B001)"
console.log(library.returnItem("MEM001", "B001"));
// ตัวอย่างผลลัพธ์: "Book TypeScript Guide returned"


// สร้าง AudioBook
const audioBook = new AudioBook(
  "Learn TypeScript",
  "AB001",
  "Jane Smith",
  180, // duration นาที
  "Narrator Joe"
);

// สร้าง DigitalMedia
const digitalMedia = new DigitalMedia(
  "JavaScript Patterns",
  "DM001",
  "PDF",
  15 // file size MB
);

// สร้าง Equipment
const equipment = new Equipment(
  "Chess Set",
  "EQ001",
  "Board Game",
  2 // quantity
);

// เพิ่ม member ใหม่
const member2 = new LibraryMember("Bob", "MEM002");

library.addItem(audioBook);
library.addItem(digitalMedia);
library.addItem(equipment);
library.addMember(member2);

// ================== ทดลองยืม ==================
console.log(library.borrowItem("MEM001", "AB001"));
// ผลลัพธ์: "AudioBook Learn TypeScript borrowed by Alice"
console.log(library.borrowItem("MEM002", "DM001"));
// ผลลัพธ์: "Digital Media JavaScript Patterns borrowed by Bob"
console.log(library.borrowItem("MEM001", "EQ001"));
// ผลลัพธ์: "Equipment Chess Set borrowed by Alice"

// ================== ตรวจสอบรายการยืม ==================
console.log("Alice's borrowed items:");
console.log(member.listBorrowedItems());
// AudioBook และ Equipment
console.log("\nBob's borrowed items:");
console.log(member2.listBorrowedItems());
// DigitalMedia

// ================== ทดลองคืน ==================
console.log(library.returnItem("MEM001", "AB001"));
// ผลลัพธ์: "AudioBook Learn TypeScript returned"
console.log(library.returnItem("MEM002", "DM001"));
// ผลลัพธ์: "Digital Media JavaScript Patterns returned"
