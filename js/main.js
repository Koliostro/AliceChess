import * as field from './field.js'
import * as pice from './pice_staff.js'

field.visualFieldGeneration()

pice.addPice(0,0,'l','pice pawn', 'b_pawn0')
pice.addPice(0,0,'r', 'pice rock', 'rock_white0')

pice.move('b_pawn0', 1,1)