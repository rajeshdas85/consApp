module.exports = {

   // https://stackoverflow.com/questions/44422694/how-would-someone-connect-their-mlab-mongodb-database-to-robomongo-when-mlab-onl
    remoteUrl : 'mongodb://rkec:rkec123@ds245347.mlab.com:45347/rkec-consapp-db',
    localUrl: 'mongodb://rkec:rkec123@ds245347.mlab.com:45347/rkec-consapp-db',
    awsAdminUrl:'mongodb://rkec:welcomerkec123456@SG-consAppDB-17902.servers.mongodirector.com:47411,SG-consAppDB-17903.servers.mongodirector.com:47411,SG-consAppDB-17904.servers.mongodirector.com:47411/consAppDB?replicaSet=RS-consAppDB-0&ssl=true',
    awsConsAPDBPUrl:'mongodb://rkec:rajeshkumardas123@SG-Consapp-17787.servers.mongodirector.com:47363,SG-Consapp-17788.servers.mongodirector.com:47363,SG-Consapp-17789.servers.mongodirector.com:47363/consAppDB?replicaSet=RS-Consapp-0&ssl=true',
};

// mongodb://<DB userName>:< User password>@SG-Consapp-17787.servers.mongodirector.com:47363,SG-Consapp-17788.servers.mongodirector.com:47363,SG-Consapp-17789.servers.mongodirector.com:47363/<DatabaseName>?replicaSet=RS-Consapp-0&ssl=true

//Example as below
// awsConsAPDBPUrl:'mongodb://rkec:rajeshkumardas123@SG-Consapp-17787.servers.mongodirector.com:47363,SG-Consapp-17788.servers.mongodirector.com:47363,SG-Consapp-17789.servers.mongodirector.com:47363/consAppDB?replicaSet=RS-Consapp-0&ssl=true',