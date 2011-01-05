/**
@fileOverview
Basic function to test the whole compiler.

@copyright
Copyright (c) 2010 Tachyon Javascript Engine, All Rights Reserved
*/

tests.basic_many_args = tests.testSuite();

tests.basic_many_args.main = function ()
{
    var basic_many_args = compileFileToJSFunc('programs/basic_many_args/basic_many_args.js', config.params);
    var x = basic_many_args();
    basic_many_args.free();
    assert(x === (20 << 2), "Invalid return value: " + x);

};
