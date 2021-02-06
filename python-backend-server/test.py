from staticfg import CFGBuilder
import os
os.environ["PATH"] += os.pathsep + "C:/Program Files (x86)/Graphviz2.38/bin"
cfg = CFGBuilder().build_from_file('basicSearch', 'adv.py')

cfg.build_visual('advCFG', 'png') #calls=False

