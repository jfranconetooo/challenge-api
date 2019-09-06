import chai from 'chai'
import appModulePath from 'app-module-path'
import path from 'path'

// Basically makes us able to "import stuff from 'some/source/folder'"
appModulePath.addPath(path.join(__dirname, '/../..'))
appModulePath.addPath(path.join(__dirname, '/..'))
chai.should()
global.expect = chai.expect
global.assert = chai.assert
