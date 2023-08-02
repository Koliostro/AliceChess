import * as field from './field.js'
import * as pice from './pice_staff.js'

field.visualFieldGeneration()

pice.addPice(0,0, 'l', 'pice pawn', 'b_p_0')

pice.move('b_p_0', 1,1)