# IONIC 3 supportable provider to get date according to the Coptic Christianity 

IONIC 3.0 with angular + typescript

![mobile-coptic](https://github.com/nbadiganti/coptic-date-mobile/blob/master/screenshots/Screen%20Shot%202018-12-06%20at%205.26.06%20PM.png)

## Adding to your project 

1. Run `ionic generate provider coptic-date` in your ionic project. It will generate provider file under src folder
2. Copy the code from provider which is available in the github (https://github.com/nbadiganti/coptic-date-mobile/blob/master/src/providers/coptic-date/coptic-date.ts)

### Adding provider to your ionic project

1. Run `import { CopticDateProvider } from '../providers/coptic-date/coptic-date';` to your app.module.ts file
2. Add `CopticDateProvider` to your providers array in app.module.ts


## Get coptic date in your component


```bash
constructor(public navCtrl: NavController, public copticProv: CopticDateProvider) {
  // Return today's date and time
  var currentTime = new Date();

  // returns the month (from 0 to 11)
  var month = currentTime.getMonth();

  // returns the day of the month (from 1 to 31)
  var day = currentTime.getDate();

  // returns the year (four digits)
  var year = currentTime.getFullYear();

  console.log(month, day + " " + year);

  this.copticDate = this.copticProv.getCopticDateString(year, month, day);
  console.log(this.copticDate);
}
```

Reference links to create this provider - https://github.com/dbishai/orthodox-presenter/blob/master/js/lib/CopticCalendar.js


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)

