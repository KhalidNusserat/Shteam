import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import CONSTANTS from "../constants";
import { GameData } from "../helpers";
import { useState } from "react";

type GameCardConfig = {
    game: GameData,
    button: string,
    onClick: (game_name: string)=>void
}

const GameCard = (props: GameCardConfig) => {
    return (
        <div>
            <Card sx={{
                width: CONSTANTS.GAME.WIDTH,
                borderRadius: '12px',
                margin: '10px'
            }}>
                <CardMedia
                    image={props.game.image}
                    sx={{ height: CONSTANTS.GAME.IMAGE.HEIGHT }}
                />
                <CardContent>
                    {
                       <Typography gutterBottom variant="h5" display='inline' marginRight='10px'>
                            {props.game.name}
                        </Typography>
                    }
                    <Typography variant="body2" gutterBottom color='text.secondary' display='inline'>
                        {props.game.price}$
                    </Typography>
                    <Typography variant="body2">
                        {props.game.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {
                        <Button
                            fullWidth
                            sx={{ borderRadius: '12px' }}
                            onClick={() => props.onClick(props.game.name)}
                        >
                            {props.button}
                        </Button>
                    }
                </CardActions>
            </Card>
        </div>
    );
};

export default GameCard;