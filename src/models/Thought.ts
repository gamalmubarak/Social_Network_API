import { Schema, model } from 'mongoose';


interface IReaction {
  reactionBody: string;  
  username: string; 
  createdAt: Date; 
}


export interface IThought extends Document {
  thoughtText: string; 
  createdAt: Date;  
  username: string; 
  reactions: IReaction[];
  reactionCount?: number; 
}

const reactionSchema = new Schema<IReaction>(
    {
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
   type: Date,
   default: Date.now,
  },
},
 {
  toJSON: {
    getters: true,
  },
  id: false,
}
);

const thoughtSchema = new Schema<IThought>(
    {
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
 {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
}
);

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;