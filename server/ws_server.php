<?php

$ss = new swoole_websocket_server("0.0.0.0", 9502);
$fds = new Fds();

$ss->on('Open', function($server, $req) use($fds){
    $fds->add($req->fd);
    echo "connections open: ".implode(',', $fds->load())."\n";
});

$ss->on('Message', function($server, $frame) use($fds) {
    echo "message from ".$frame->fd."; msg: ".$frame->data."\n";
    foreach ($fds->load() as $fd) {
      $server->push($fd, json_encode(array('data' => $frame->data, 'fd' => $frame->fd)));
    }
});

$ss->on('Close', function($server, $fd) use($fds) {
    $fds->remove($fd);
    echo "connections close: ".implode(',', $fds->load())."\n";
});

$ss->start();

class Fds{
  private $fds=array();

  function __construct(){
    file_exists('fds.txt') ? $this->load() : $this->save();
  }

  function remove($fd){
    $this->load();
    $this->fds = array_diff($this->fds, [$fd]);
    return $this->save();
  }

  function add($fd){
    $this->load();
    $this->fds[$fd] = $fd;
    return $this->save();
  }

  function save(){
    $this->fds = array_unique($this->fds);
    file_put_contents('fds.txt', json_encode($this->fds));
    $this->load();
  }

  function load(){
    return $this->fds = json_decode(file_get_contents('fds.txt'), true);
  }
}
