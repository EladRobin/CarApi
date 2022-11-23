import Car from "./CarClass";

const API_URL = `https://project-yarin.herokuapp.com/cars?perPage=99`

const select = document.querySelector('#id_select');
const categories = [] //משתנה גלובלי לקטגוריות מתוך הגייסון
let cars = []
    //פונקציה לאתחול האפליקציה כל מה שמופעל בהתחלה יעבור דרכה
const init = () => {
    doApi(); //קריאה לפונקציה שעושה בקשת אייפייאיי
}

//פונקציה לאירועים באפליקציה כל האזנות לאירועים יהיו בפונקציה זאת
const declareEvents = () => {
    carsFilter()
}

//בקשת api
const doApi = async() => {
    //response
    const resp = await fetch(API_URL);
    // console.log(resp);

    //data to json
    const data = await resp.json();
    // פונקציה המייצרת קטגוריות וסלקס אינפוט בכדי שנוכל לפלטר בהתאם את המכוניות לפי קטגוריה
    createCategories(data);
    // console.log(data);
    createCars(data) //פונקציה שמרנדרת למסך כל מכונית ומכונית
    cars = data;
}


const createCars = (_arr) => {
    //שורה זאת נועדה לאתחל לאפס את כל האלמנטים שבאבא בכדי שלא יווצר כפילויות
    document.querySelector('#parent').innerHTML = ""
        // for (let i = 0; i < _arr.length; i++) {
        //     const car = new Car('#parent', _arr[i].company, _arr[i].model, _arr[i].year, _arr[i].price, _arr[i].img_url, _arr[i].category);
        //     car.render()
        // }

    // _arr.forEach(item => {
    //     const car = new Car('#parent', item.company, item.model, item.year, item.price, item.img_url, item.category);
    //     car.render()
    // });
    //רץ על המערך המכוניות שיתקבל מהבקשה
    _arr.forEach(item => {
        //מייצר לכל אחד מפריטים של המערך אובייקט מכונית
        const car = new Car('#parent', item);
        car.render() //קורא לשיטה רנדר לפעול ולהציג לי כל מכונית על המסך
    });

}

//פונקציה המייצרת קטגוריות ומייצרת סלקט אינפוט
const createCategories = (_arr) => {
    categories.push("All"); // קטגוריה שתציג את כל המכוניות
    //רץ על הגייסון
    _arr.forEach((item) => {
        //אם לא קיים הקטגוריה בתוך מערך הקטגוריות הגלובלי תדחוף את הקטגוריה פנימה
        if (!categories.includes(item.category))
            categories.push(item.category) //דוחף את הקטגוריה למערך הקטגוריות
    });

    // console.log(categories)
    //רץ על מערך הקטגוריות לאחר שהוכנסו מתוך הגייסון
    categories.forEach(cat => {
        //יוצר אלמנט אופשן אל תוך הסלקט מכל קטגוריה
        const opt = document.createElement('option');
        //ווליו הערך של האופשן
        opt.value = cat;
        //אינר הייצ׳-טי-אמ-אל מה שיוצג באופשן ויזואלית
        opt.innerHTML = cat;
        //מכניס כל אופשן שייצרנו אל תוך הסלקט
        select.append(opt)
    });
}

//פונקציה המקבלת קטגוריה ומפלטרת בהתאם את המערך לאחר מכן מרנדרת למסך את המערך המפולטר בהתאם
const carsFiltering = (_category) => {
    let filterd = []
        //תנאי שאם זה לא שווה לכל המכוניות או לסטרינג ריק בצע
    if (_category != 'All' && _category != "") {
        //פילטר פונקציה מובנת בגאווה סקריפט שמפלטרת מערך לפי תנאי ומחזריה מערך חדש
        filterd = cars.filter(car => car.category == _category) //מערך מפולטר לפי קטגוריות
    } else { //במידה ואין קטגוריה או שזה כל המכוניות
        filterd = cars //השמה של כל המכוניות למערך המפולטר
    }
    //קריאה לפונקציה שמרנדרת למסך את המכוניות
    createCars(filterd)
    console.log(filterd)
}

//פונקציה שמבצעת אירוע אונצ׳יינג עבור בחירת קטגוריה בסלקט בעזרת שינוי
const carsFilter = () => {
    //באירוע זה אני מעביר את האוונט בפונקציית קולבק
    select.addEventListener('change', (e) => {
        // console.log(e.target.value)
        //תפסנו את הערך של האופשן בסלקט
        const category = e.target.value;
        //קריאה לפונקציה שמפלטרת את המערך של המכוניות בעזרת הקטגוריה שנבחרה
        carsFiltering(category)
    })
}

declareEvents()
init()