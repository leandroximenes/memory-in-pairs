class socket {
    constructor(url) {
      this.url = url;
    }
  
    increaseSalary() {
      this.salary += 100;
    }
  }
  
  // 👇️ named export (same as previous code snippet)
  export {socket};