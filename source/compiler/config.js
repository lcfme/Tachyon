/**
@fileOverview
Configuration file for the Tachyon compiler.

@author
Maxime Chevalier-Boisvert, Erick Lavoie

@copyright
Copyright (c) 2010-2011 Tachyon Javascript Engine, All Rights Reserved
*/

/**
Configuration object for the compiler
*/
var config = {};

/**
Initialize the Tachyon configuration
*/
function initConfig(is64bit, verbosity)
{
    if (is64bit === undefined)
        is64bit = false;

    if (verbosity === undefined)
        verbosity = log.ALL;

    config.verbosity = verbosity;

    log.trace('Initializing config (' + (is64bit? '64':'32') + 'bit)');

    // Determine the heap size
    var heapSize;
    if (is64bit)
    {
        // Tachyon 64bit => 32GB
        heapSize = Math.pow(2,35)-100;
    }
    else
    {        
        if (RUNNING_IN_TACHYON)
            heapSize = Math.pow(2, 28);     // Tachyon/Tachyon 32-bit => 256MB
        else
            heapSize = 1 * Math.pow(2,30);  // Tachyon/V8 32bit => 1GB
    }

    /**
    Compilation parameters for the currently running Tachyon VM.
    The tachyon code has special privileges.
    */
    config.hostParams = new CompParams({
        target          : is64bit? Target.x86_64 : Target.x86_32,
        tachyonSrc      : true,
        debug           : true,
        parserWarnings  : true,
        debugTrace      : false,
        heapSize        : heapSize,
        staticEnv       : new StaticEnv()
    });

    /**
    Compilation parameters for the client code tachyon compiles and runs.
    The parameters are the same as for host code, but the client code has
    no special privileges.
    */
    config.clientParams = Object.create(config.hostParams);
    config.clientParams.tachyonSrc = false;
    config.clientParams.parserWarnings = false;

    /**
    Compilation parameters for debugging client code.
    */
    config.clientDebugParams = Object.create(config.clientParams);
    config.clientDebugParams.debug = true;
    config.clientDebugParams.debugTrace = true;

    /**
    Compilation parameters used to bootstrap Tachyon
    */
    config.bootParams = new CompParams({
        target          : is64bit ? Target.x86_64 : Target.x86_32,
        tachyonSrc      : true,
        debug           : true,
        parserWarnings  : true,
        debugTrace      : false,
        heapSize        : heapSize,
        staticEnv       : new StaticEnv()
    });

    // TODO: object representation choice
    // TODO: GC parameters
}

