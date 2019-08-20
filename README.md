# cyclop

High speed database solution based the chained pointers technique

This database system saves objects as a chained list in order to improve parsing speed.

A cache system keeps every objects in memory and the objects are saved in a compressed file within a function calling itself as long as there is modifications to be saved.
