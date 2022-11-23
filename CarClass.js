class Car { //יצירת קלאס עבור מכונית
    //ייצור בנאי עבור מכונית
    constructor(_parent, _item) {
            this.parent = _parent;
            this.company = _item.company;
            this.model = _item.model;
            this.year = _item.year;
            this.price = _item.price;
            this.image = _item.img_url;
            this.category = _item.category;
        }
        //שיטה שדואגת לרנדר לי ולהציג על המסך כל מכונית מכונית לפי הרפייבטים
    render() {
        let div = document.createElement('div'); //מייצר אלמנט של דיב
        div.className = "col-12 col-md-6 col-lg-4 p-3"; //נותן קלאס לדיב שיצרנו
        document.querySelector(this.parent).append(div); //מוסיף לאבא את הדיב שיצרנו
        //מכניס html אל תוך הדיב שייצרנו משרשר בתוכו את כל הפרייבטים בהתאם
        div.innerHTML = `
        <div class="p-2 shadow border text-center">
            <h3>${this.company}</h3>
            <img width="100%" src=${this.image} alt=${this.model}>
            <h4>Model:${this.model} Year:${this.year}</h4>
            <p>price: ${this.price}$ category:${this.category}</p>
        </div>
        `
    }
}

export default Car; // מייצא את הקלאס בכדי שנוכל לייבא בשיטת המודוליםשנוכל לייבא בשיטת המודולים