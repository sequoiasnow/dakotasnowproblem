<?php

shell_exec( 'git pull' );
print 'Git Pull Complete';

print '<br /><hr /><br />';

shell_exec( 'gulp' );
