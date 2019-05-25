/**
* Learn Salesforce Commerce Cloud
*
* @author HDK
* Import inventory from the WebDav Directory 
*/
importPackage( dw.system );
importPackage( dw.io );

function execute( args : PipelineDictionary ) : Number {
    var filePath = 'download' + File.SEPARATOR + 'inventory' + File.SEPARATOR + 'inventory_20190524101000.xml';
    var sourceFile : File = new File(File.IMPEX + File.SEPARATOR + 'src' + File.SEPARATOR + filePath);

    // Kiem tra neu file khong ton tai se xuat trang thai loi trong Job
    if (!sourceFile.exists()) {
        throw new Error("Cannot found import file.");
    }

    // Goi pipelet import inventory - ImportInventoryLists
    // Mac dinh se set ImportMode = "MERGE"
    var importResult = new Pipelet('ImportInventoryLists').execute({
        ImportFile: filePath,
        ImportMode: "MERGE"
    });
    if (importResult.ErrorCode != 0) {
        throw new Error(importResult.ErrorMsg);
    }

    return PIPELET_NEXT;
}

/** Exported functions **/
module.exports = {
    execute: execute
}
