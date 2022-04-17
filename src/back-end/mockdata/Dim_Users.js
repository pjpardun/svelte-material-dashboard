const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

let Dim_Users = function() {
    return [
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Nunez, Ella", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Nunez, Ella", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "NunezE@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Nunez", 
         "ID_UserID": "NunezE", 
         "DESC_UserFirstName": "Ella"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Morris, Fredrick", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Morris, Fredrick", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "MorrisF@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Morris", 
         "ID_UserID": "MorrisF", 
         "DESC_UserFirstName": "Fredrick"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Salazar, Angelica", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Salazar, Angelica", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "SalazarA@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Salazar", 
         "ID_UserID": "SalazarA", 
         "DESC_UserFirstName": "Angelica"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Hart, Bethany", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Hart, Bethany", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "HartB@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Hart", 
         "ID_UserID": "HartB", 
         "DESC_UserFirstName": "Bethany"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Walton, Jeffery", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Walton, Jeffery", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "WaltonJ@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Walton", 
         "ID_UserID": "WaltonJ", 
         "DESC_UserFirstName": "Jeffery"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Fisher, Natalie", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Fisher, Natalie", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "FisherN@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Fisher", 
         "ID_UserID": "FisherN", 
         "DESC_UserFirstName": "Natalie"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Steele, Phillip", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Steele, Phillip", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "SteeleP@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Steele", 
         "ID_UserID": "SteeleP", 
         "DESC_UserFirstName": "Phillip"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Gibbs, Dixie", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Gibbs, Dixie", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "GibbsD@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Gibbs", 
         "ID_UserID": "GibbsD", 
         "DESC_UserFirstName": "Dixie"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Lucas, Doug", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Lucas, Doug", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "LucasD@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Lucas", 
         "ID_UserID": "LucasD", 
         "DESC_UserFirstName": "Doug"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Lindsey, Gerald", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Lindsey, Gerald", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "LindseyG@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Lindsey", 
         "ID_UserID": "LindseyG", 
         "DESC_UserFirstName": "Gerald"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Maxwell, Paulette", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Maxwell, Paulette", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "MaxwellP@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Maxwell", 
         "ID_UserID": "MaxwellP", 
         "DESC_UserFirstName": "Paulette"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Ray, Jermaine", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Ray, Jermaine", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "RayJ@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Ray", 
         "ID_UserID": "RayJ", 
         "DESC_UserFirstName": "Jermaine"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Burke, Dana", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Burke, Dana", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "BurkeD@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Burke", 
         "ID_UserID": "BurkeD", 
         "DESC_UserFirstName": "Dana"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Gill, Janis", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Gill, Janis", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "GillJ@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Gill", 
         "ID_UserID": "GillJ", 
         "DESC_UserFirstName": "Janis"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Collier, Ollie", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Collier, Ollie", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "CollierO@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Collier", 
         "ID_UserID": "CollierO", 
         "DESC_UserFirstName": "Ollie"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Lowe, Fannie", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Lowe, Fannie", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "LoweF@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Lowe", 
         "ID_UserID": "LoweF", 
         "DESC_UserFirstName": "Fannie"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Patrick, Bennie", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Patrick, Bennie", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "PatrickB@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Patrick", 
         "ID_UserID": "PatrickB", 
         "DESC_UserFirstName": "Bennie"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Thompson, Duane", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Thompson, Duane", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "ThompsonD@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Thompson", 
         "ID_UserID": "ThompsonD", 
         "DESC_UserFirstName": "Duane"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Lawson, Noel", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Lawson, Noel", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "LawsonN@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Lawson", 
         "ID_UserID": "LawsonN", 
         "DESC_UserFirstName": "Noel"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Reed, Colin", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Reed, Colin", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "ReedC@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Reed", 
         "ID_UserID": "ReedC", 
         "DESC_UserFirstName": "Colin"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Barnes, Kelly", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Barnes, Kelly", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "BarnesK@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Barnes", 
         "ID_UserID": "BarnesK", 
         "DESC_UserFirstName": "Kelly"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "White, Ernesto", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "White, Ernesto", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "WhiteE@cockapoowebdesigns.com", 
         "DESC_UserLastName": "White", 
         "ID_UserID": "WhiteE", 
         "DESC_UserFirstName": "Ernesto"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Huff, Freda", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Huff, Freda", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "HuffF@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Huff", 
         "ID_UserID": "HuffF", 
         "DESC_UserFirstName": "Freda"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Gregory, Jason", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Gregory, Jason", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "GregoryJ@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Gregory", 
         "ID_UserID": "GregoryJ", 
         "DESC_UserFirstName": "Jason"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Brady, Katrina", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Brady, Katrina", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "BradyK@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Brady", 
         "ID_UserID": "BradyK", 
         "DESC_UserFirstName": "Katrina"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Hopkins, Leigh", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Hopkins, Leigh", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "HopkinsL@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Hopkins", 
         "ID_UserID": "HopkinsL", 
         "DESC_UserFirstName": "Leigh"
        }, 
        {
         "DESC_UserDepartment":  lorem.generateWords(1),
         "DESC_UserFullName": "Stevenson, Diana", 
         "userAccountControl": null, 
         "DESC_UserAccountControl": null, 
         "DESC_UserNiceName": "Stevenson, Diana", 
         "DESC_DistinguishedName": null, 
         "lastLogon": null, 
         "DESC_UserCompany":  lorem.generateWords(1),
         "DESC_UserEmail": "StevensonD@cockapoowebdesigns.com", 
         "DESC_UserLastName": "Diana", 
         "ID_UserID": "StevensonD", 
         "DESC_UserFirstName": "Stevenson"
        }
       ]
}
exports.get = Dim_Users
